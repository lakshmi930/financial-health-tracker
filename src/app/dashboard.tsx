"use client";

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Highlights from './highlights';
import SpendingAnalysis from './spending';
import Savings from './savings';
import Loans from './loans';


export default function FinancialDashboard() {

  const [chatMessage, setChatMessage] = useState('');
  const [conversationContext, setConversationContext] = useState<any>([]);
  const [currentMessages, setCurrentMessages] = useState<any>([]);

  console.log('GEMINI_API_KEY', process.env.NEXT_PUBLIC_GEMINI_API_KEY)
  const configuration = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = configuration.getGenerativeModel({ model: 'gemini-pro' });

  const handleChat = async () => {
    try {
      // Restore the previous context
      for (const [inputText, responseText] of conversationContext) {
        setCurrentMessages(prev => [...prev, { role: "user", parts: inputText }]);
        setCurrentMessages(prev => [...prev, { role: "model", parts: responseText }]);
      }
  
      const chat = model.startChat({
        history: currentMessages,
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

    const result = await chat.sendMessage(chatMessage);
    const response = await result.response;
    const responseText = response.text();

    // Stores the conversation
    setConversationContext(prev => [...prev, [prompt, responseText]]);
    console.log(conversationContext[0]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full p-8">
      <div className='flex w-full gap justify-between	'>
        <div>
          <motion.h2 
            className="text-2xl mb-8 text-[#4A6670]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello Joe! 
          </motion.h2>
          <motion.h1 
            className="text-4xl font-bold mb-8 text-[#4A6670]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Financial Health Tracker
          </motion.h1>
        </div>
        <motion.div>Generated on 03.11.2023</motion.div>
    </div>
      
      <Highlights />

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <SpendingAnalysis />
        <Savings />
      </div>

      <div className="grid gap-6 mt-6">
        <Loans />
      </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="mt-6 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-[#4A6670]">Financial Assistant</CardTitle>
              <CardDescription>Ask for personalized financial advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  className="flex-grow"
                  placeholder="How can I improve my savings?"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button className="bg-[#4A6670] hover:bg-[#3A5560]" onClick={handleChat}>
                  <Send className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Card className="mt-4 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-[#4A6670]">Personalized Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {conversationContext[0]?.[1]}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
      </motion.div>
    </div>
  )
}
