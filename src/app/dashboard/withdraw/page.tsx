"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const withdrawalHistory = [
    { date: "2024-07-20", method: "PayPal", amount: "1,000", status: "Pending" },
    { date: "2024-07-18", method: "Crypto (BTC)", amount: "500", status: "Completed" },
    { date: "2024-07-15", method: "Mobile Recharge", amount: "200", status: "Completed" },
];

export default function WithdrawPage() {
  const { toast } = useToast();
  const [method, setMethod] = useState("paypal");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const currentPoints = 1250;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !details) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields.",
      });
      return;
    }
    if (parseInt(amount) > currentPoints) {
        toast({
          variant: "destructive",
          title: "Insufficient Points",
          description: "You don't have enough points to withdraw this amount.",
        });
        return;
    }
    
    toast({
      title: "Withdrawal Requested",
      description: `Your request to withdraw ${amount} points via ${method} is being processed.`,
    });

    setAmount("");
    setDetails("");
  };

  const getPlaceholder = () => {
    switch (method) {
      case "paypal": return "Your PayPal email";
      case "crypto": return "Your BTC wallet address";
      case "mobile": return "Your phone number";
      default: return "";
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Request Withdrawal</CardTitle>
          <CardDescription>Your current points: <span className="font-bold text-primary">{currentPoints.toLocaleString()}</span></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-2 block">Withdrawal Method</Label>
              <RadioGroup defaultValue="paypal" onValueChange={setMethod} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto">Crypto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile">Mobile Recharge</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Points to Withdraw</Label>
              <Input id="amount" type="number" placeholder="e.g., 500" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Input id="details" type="text" placeholder={getPlaceholder()} value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
            
            <Button type="submit" className="w-full">Request Withdrawal</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>Your recent withdrawal requests.</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawalHistory.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.method}</TableCell>
                <TableCell className="text-right">{item.amount}</TableCell>
                <TableCell className="text-center">
                   <Badge variant={
                     item.status === 'Completed' ? 'default' 
                     : item.status === 'Pending' ? 'secondary' 
                     : 'destructive'
                   } className={item.status === 'Completed' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' : item.status === 'Pending' ? 'bg-amber-500/20 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : ''}>
                     {item.status}
                   </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  );
}
