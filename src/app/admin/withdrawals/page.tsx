"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const withdrawalData = [
  { id: "wd_1", user: "CryptoKing", userId: "usr_1", points: 5000, method: "PayPal", details: "ck@example.com", date: "2024-07-21", status: "Pending" },
  { id: "wd_2", user: "AdWatcherPro", userId: "usr_2", points: 2000, method: "Crypto (BTC)", details: "bc1q...", date: "2024-07-20", status: "Pending" },
  { id: "wd_3", user: "User123", userId: "usr_4", points: 1000, method: "Mobile Recharge", details: "+123456789", date: "2024-07-19", status: "Approved" },
  { id: "wd_4", user: "BannedUser", userId: "usr_3", points: 500, method: "PayPal", details: "bu@example.com", date: "2024-07-18", status: "Denied" },
];

export default function WithdrawalsPage() {
    const { toast } = useToast();

    const handleAction = (id: string, action: 'Approve' | 'Deny') => {
        toast({
            title: `Request ${action}d`,
            description: `Withdrawal request ${id} has been ${action.toLowerCase()}d.`
        })
    }

  const renderTable = (status: "Pending" | "Approved" | "Denied") => {
    const filteredData = withdrawalData.filter(w => w.status === status);
    
    if (filteredData.length === 0) {
        return <p className="text-center text-muted-foreground p-8">No {status.toLowerCase()} requests.</p>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Method & Details</TableHead>
            <TableHead>Date</TableHead>
            {status === "Pending" && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((w) => (
            <TableRow key={w.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${w.userId}`} alt={w.user} />
                    <AvatarFallback>{w.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{w.user}</span>
                </div>
              </TableCell>
              <TableCell>{w.points.toLocaleString()}</TableCell>
              <TableCell>
                <p className="font-medium">{w.method}</p>
                <p className="text-sm text-muted-foreground truncate">{w.details}</p>
              </TableCell>
              <TableCell>{w.date}</TableCell>
              {status === "Pending" && (
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleAction(w.id, 'Approve')} className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/50">Approve</Button>
                    <Button variant="outline" size="sm" onClick={() => handleAction(w.id, 'Deny')} className="text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/50">Deny</Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Management</CardTitle>
        <CardDescription>Approve or deny user withdrawal requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="denied">Denied</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            {renderTable("Pending")}
          </TabsContent>
          <TabsContent value="approved">
            {renderTable("Approved")}
          </TabsContent>
          <TabsContent value="denied">
            {renderTable("Denied")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
