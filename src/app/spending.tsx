import { motion } from 'framer-motion'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SpendingAnalysis() {
    const spendingData = [
        { category: 'Medicines', amount: 50 },
        { category: 'Food', amount: 100 },
        { category: 'Transport', amount: 200 },
        { category: 'Utilities', amount: 150 },
        { category: 'Entertainment', amount: 100 },
    ];
    return (
        <motion.div className="flex" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="overflow-hidden w-full">
            <CardHeader>
              <CardTitle className="text-[#4A6670]">Spending Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={spendingData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Bar dataKey="amount" fill="#9DB5B2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
)};
