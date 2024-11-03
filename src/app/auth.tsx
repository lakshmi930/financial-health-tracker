"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Highlights from './highlights';
import SpendingAnalysis from './spending';
import Savings from './savings';
import Loans from './loans';

export default function FinancialDashboard() {
  const [chatMessage, setChatMessage] = useState('')

  return (
    <div className="w-full p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-[#4A6670]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Financial Health Tracker
      </motion.h1>
      
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
              <Button className="bg-[#4A6670] hover:bg-[#3A5560]">
                <Send className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
