"use client";

import { motion } from 'framer-motion';

import AiAssistant from './ai-assistant';
import Highlights from './highlights';
import SpendingAnalysis from './spending';
import Savings from './savings';
import Loans from './loans';


export default function FinancialDashboard() {
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
      <AiAssistant />
    </div>
  )
}
