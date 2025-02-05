"use client";

import { motion } from 'framer-motion';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AIResponse from './ai-response';

export default function AIAssistant() {
    const [chatMessage, setChatMessage] = useState('');
    const [conversationContext, setConversationContext] = useState<[string, string][]>([]);
    const [currentMessages, setCurrentMessages] = useState<Content[]>([]);

    const configuration = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    const model = configuration.getGenerativeModel({ 
        model: 'gemini-1.5-flash', 
        systemInstruction: "You are an expert financial advisor, with in depth knowledge, for example, about earlier repayment of loan. Give responses that are helpful and informative. Always give responses in less than 250 words.",
    });

    const handleChat = async () => {
        try {
          // Restore the previous context
          for (const [inputText, responseText] of conversationContext) {
            setCurrentMessages(prev => [...prev, { role: "user", parts: inputText }] as Content[]);
            setCurrentMessages(prev => [...prev, { role: "model", parts: responseText }] as Content[]);
          }
      
          const chat = model.startChat({ history: currentMessages });
    
        const result = await chat.sendMessage(chatMessage);
        const responseText = await result.response && result.response?.text();
    
        // Stores the conversation
        setConversationContext(prev => [...prev, [prompt, responseText]] as [string, string][]);
    
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return (
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
          {!!conversationContext.length && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card className="mt-4 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#4A6670]">Personalized Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                    <AIResponse response={conversationContext[conversationContext.length - 1][1]} />
                </CardContent>
              </Card>
            </motion.div>
          )}
      </motion.div>
    );
};
