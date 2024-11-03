import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function Loans() {
    return (
        <motion.div className="flex" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="overflow-hidden w-full">
            <CardHeader>
              <CardTitle className="text-[#4A6670]">Financial Goals</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  { name: "Home Mortage", progress: 45, current: 1350, goal: 3000, color: "#9DB5B2" },
                  { name: "Car Loan", progress: 75, current: 7500, goal: 10000, color: "#4A6670" },
                  { name: "Mobile", progress: 60, current: 12000, goal: 20000, color: "#9DB5B2" },
                  { name: "Personal Loan", progress: 20, current: 1000, goal: 5000, color: "#F2CC8F" },
                  { name: "Credit Card", progress: 20, current: 1000, goal: 5000, color: "#6D597A" },
                ].map((goal, index) => (
                  <div key={goal.name} className="space-y-2">
                    <Label htmlFor={`goal${index + 1}`}>{goal.name}</Label>
                    <Progress 
                        id={`goal${index + 1}`} 
                        value={goal.progress} 
                        className="h-2"
                        style={{
                            '--progress-background': goal.color,
                        } as React.CSSProperties}
                    />
                    <p className="text-sm text-muted-foreground">
                      £{goal.current.toLocaleString()} / ${goal.goal.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
)}
