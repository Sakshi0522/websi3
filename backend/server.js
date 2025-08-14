// Merged backend for contact form, AI chatbot, and blog management

// Load environment variables from a .env file
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require("fs");
const crypto = require("crypto"); 
const axios = require('axios'); // Required for the Gemini API call
const path = require('path');
const jwt = require('jsonwebtoken'); // New: For JWT authentication
const bcrypt = require('bcryptjs'); // New: For password hashing

const app = express();
const port = process.env.PORT || 3001; 

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// A simple in-memory store for session tokens.
const tokenStore = {};

// Define a simple FAQ system for the chatbot
const faqResponses = {
  "what services do you offer?": "We offer Telecom Infrastructure, Geospatial & GIS Solutions, Skill Development, and Consultancy & Business Incubation.",
  "what are your business hours?": "Our business hours are Monday - Sunday, from 9:00 AM to 8:00 PM.",
  "how do i contact support?": "You can contact our support team via email at info@digitalindian.co.in or by calling +91 7908735132.",
  "how can i book a meeting?": "You can book a meeting by using the 'View Calendar' option on our contact page to schedule a time that works for you."
};

// Create a Nodemailer transporter using your email service's credentials from .env
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify the transporter connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server connection is ready!');
  }
});

// New endpoint to generate a unique session token for the contact form
app.get('/api/token', (req, res) => {
    const token = crypto.randomUUID();
    tokenStore[token] = Date.now();
    console.log("New token generated:", token);
    res.json({ token });
});


// Define the API endpoint to handle form submissions
app.post('/api/send-email', upload.single('document'), async (req, res) => {
  // Extract form data and the token
  const { name, email, company, phone, message, token } = req.body;
  const document = req.file;

  // Step 1: Validate the session token
  const storedToken = tokenStore[token];
  if (!storedToken) {
    console.error("Token verification failed: Invalid or missing token.");
    if (document?.path) fs.unlinkSync(document.path);
    return res.status(400).json({ success: false, message: "Invalid session token." });
  }

  delete tokenStore[token];

  console.log('Received form data:', req.body);
  if (document) {
    console.log('Received document:', document.originalname);
  }

  // Step 2: Set up email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'ankurr.era@gmail.com',
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Message from Your Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    attachments: []
  };

  if (document) {
    mailOptions.attachments.push({
      filename: document.originalname,
      content: fs.readFileSync(document.path)
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    if (document?.path) fs.unlinkSync(document.path);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    if (document?.path) fs.unlinkSync(document.path);
    res.status(500).json({ success: false, message: 'Error sending email.' });
  }
});

// New chat endpoint for the AI chatbot
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();

  // FIX: Handle date-related queries with a hardcoded response
  if (userMessage.includes("date") || userMessage.includes("today")) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return res.status(200).json({ reply: `Hello! Today is ${formattedDate}.` });
  }

  // Step 1: Check if the user's message matches an FAQ
  if (faqResponses[userMessage]) {
    return res.status(200).json({ reply: faqResponses[userMessage] });
  }

  // Step 2: If not an FAQ, use the Gemini API to generate a response
  try {
    const chatHistory = [];
    chatHistory.push({
      role: "user",
      parts: [
        { text: `You are an AI assistant for the company 'Digital Indian'. Your goal is to be friendly and helpful. If a user asks a question, provide a concise and professional response. The user asked: "${userMessage}".` }
      ]
    });

    const payload = { contents: chatHistory };
    const apiKey = process.env.GEMINI_API_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    // Add a check to ensure the API key is provided
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is not set in the environment variables.");
      return res.status(500).json({ reply: "I'm sorry, my API key is not configured. Please contact the administrator." });
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    const geminiData = await response.json();
    
    // Add checks to prevent crashes if the API response is not as expected
    if (geminiData.candidates && geminiData.candidates.length > 0 && geminiData.candidates[0].content) {
        const replyText = geminiData.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: replyText });
    } else {
        console.error("Invalid response from Gemini API:", geminiData);
        res.status(500).json({ reply: "I'm sorry, I received an invalid response. Please try again." });
    }

  } catch (error) {
    console.error("Error with AI model call:", error.message);
    res.status(500).json({ reply: "I'm sorry, I couldn't process that request right now. Please try again later." });
  }
});


// New: Middleware to protect admin routes
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username !== process.env.ADMIN_USERNAME) {
      return res.status(403).json({ message: 'Authentication failed: Invalid user.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed: Invalid token.' });
  }
};


// New Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // In a real app, hash the password. Here, we're using a simple string comparison for demonstration based on the provided .env.
  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});


// Blog management API endpoints
const blogsFilePath = path.join(__dirname, 'blogs.json');

// Helper function to read blogs from the JSON file
const readBlogs = () => {
  try {
    if (!fs.existsSync(blogsFilePath)) {
      fs.writeFileSync(blogsFilePath, '[]', 'utf8');
    }
    const data = fs.readFileSync(blogsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs.json:', error);
    return [];
  }
};

// Helper function to write blogs to the JSON file
const writeBlogs = (blogs) => {
  try {
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to blogs.json:', error);
  }
};

// Helper function to read subscribers
const subscribersFilePath = path.join(__dirname, 'subscribers.json');

const readSubscribers = () => {
    if (!fs.existsSync(subscribersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(subscribersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to send email notification to all subscribers
const sendNewBlogPostEmail = (blogPost) => {
  const subscribers = readSubscribers();
  if (subscribers.length === 0) {
    console.log('No subscribers found. Email notification not sent.');
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: subscribers.join(','),
    subject: `New Blog Post: ${blogPost.title}`,
    html: `
      <h2>New Blog Post Published!</h2>
      <p>Hello,</p>
      <p>A new blog post titled <strong>"${blogPost.title}"</strong> has been published on our website.</p>
      <p>${blogPost.excerpt}</p>
      <a href="http://localhost:5173/blog/${blogPost.id}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 5px;">Read the Full Article</a>
      <p>Thank you for staying updated with us.</p>
      <br>
      <p>The Digital Indian Team</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending blog post notification email:', error);
    } else {
      console.log('Blog post notification email sent successfully:', info.response);
    }
  });
};

// GET all blog posts
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');
  res.json(publishedBlogs);
});

// GET all blogs (including drafts) for admin
app.get('/api/admin/blogs', authenticateAdmin, (req, res) => {
  const blogs = readBlogs();
  res.json(blogs);
});

// POST a new blog post
app.post('/api/blogs', authenticateAdmin, (req, res) => {
  const newBlog = req.body;
  const blogs = readBlogs();
  newBlog.id = crypto.randomUUID();
  newBlog.date = new Date().toISOString().split('T')[0];
  newBlog.status = newBlog.status || 'draft';
  blogs.push(newBlog);
  writeBlogs(blogs);

  // If the new post is published, schedule an email notification
  if (newBlog.status === 'published') {
    console.log(`New blog post "${newBlog.title}" published. Scheduling email notification in 5 minutes.`);
    setTimeout(() => {
      sendNewBlogPostEmail(newBlog);
    }, 5 * 60 * 1000); // 5 minutes delay
  }

  res.status(201).json({ success: true, message: 'Blog post created' });
});

// PUT (update) a blog post
app.put('/api/blogs/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const updatedBlog = req.body;
  let blogs = readBlogs();
  const index = blogs.findIndex(blog => blog.id === id);

  if (index !== -1) {
    const oldBlog = blogs[index];
    blogs[index] = { ...oldBlog, ...updatedBlog };
    writeBlogs(blogs);

    // If a draft is updated to published, schedule an email notification
    if (oldBlog.status === 'draft' && blogs[index].status === 'published') {
      console.log(`Blog post "${blogs[index].title}" has been published. Scheduling email notification in 5 minutes.`);
      setTimeout(() => {
        sendNewBlogPostEmail(blogs[index]);
      }, 5 * 60 * 1000); // 5 minutes delay
    }

    res.json({ success: true, message: 'Blog post updated' });
  } else {
    res.status(404).json({ success: false, message: 'Blog post not found' });
  }
});

// DELETE a blog post
app.delete('/api/blogs/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  let blogs = readBlogs();
  const initialLength = blogs.length;
  blogs = blogs.filter(blog => blog.id !== id);
  if (blogs.length < initialLength) {
    writeBlogs(blogs);
    res.json({ success: true, message: 'Blog post deleted' });
  } else {
    res.status(404).json({ success: false, message: 'Blog post not found' });
  }
});

// New API route for newsletter subscription
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    
    // Helper function to read/write subscribers
    const writeSubscribers = (subscribers) => {
        fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2));
    };

    try {
        if (!fs.existsSync(subscribersFilePath)) {
            fs.writeFileSync(subscribersFilePath, '[]', 'utf-8');
        }
        const subscribers = readSubscribers();

        if (subscribers.includes(email)) {
            return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
        }

        subscribers.push(email);
        writeSubscribers(subscribers);

        res.status(200).json({ success: true, message: 'Subscription successful!' });
    } catch (error) {
        console.error('Failed to handle subscription:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
