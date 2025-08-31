"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const earningsData = [
  { date: "2024-07-21", activity: "Ad Watched", points: "+10", status: "Completed" },
  { date: "2024-07-21", activity: "Daily Bonus", points: "+50", status: "Completed" },
  { date: "2024-07-20", activity: "Withdrawal (PayPal)", points: "-1,000", status: "Pending" },
  { date: "2024-07-20", activity: "Referral Bonus", points: "+100", status: "Completed" },
  { date: "2024-07-19", activity: "Ad Watched", points: "+8", status: "Completed" },
  { date: "2024-07-18", activity: "Withdrawal (Crypto)", points: "-500", status: "Completed" },
  { date: "2024-07-18", activity: "Ad Watched", points: "+12", status: "Completed" },
];

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings History</CardTitle>
        <CardDescription>A detailed log of your account activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {earningsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.activity}</TableCell>
                <TableCell className={`text-right ${item.points.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {item.points}
                </TableCell>
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
  );
}
