import { motion } from 'framer-motion'
import { CreditCard, DollarSign, PiggyBank, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Highlights() {
return (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {[
    { title: "Financial Health Score", icon: TrendingUp, value: "78/100", change: "+2 from last month", color: "#4A6670" },
    { title: "Total Savings", icon: PiggyBank, value: "£5,240", change: "+12% from last month", color: "#9DB5B2" },
    { title: "Monthly Spending", icon: CreditCard, value: "£2,050", change: "-5% from last month", color: "#D57A66" },
    { title: "Debt-to-Income Ratio", icon: DollarSign, value: "32%", change: "-3% from last month", color: "#4A6670" },
  ].map((item, index) => (
    <motion.div key={item.title} className="flex" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Card className="flex flex-col w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          <item.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
          {item.title === "Financial Health Score" || item.title === "Debt-to-Income Ratio" ? (
            <Progress 
              value={parseInt(item.value)} 
              className="mt-2"
              style={{
                '--progress-background': item.color,
              } as React.CSSProperties}
            />
          ) : null}
          <p className="text-xs text-muted-foreground mt-2">{item.change}</p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
)};
