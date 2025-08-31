"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Clapperboard, Star, Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, user: "CryptoKing", points: 25890, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { rank: 2, user: "AdWatcherPro", points: 24100, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { rank: 3, user: "PointMaster", points: 22500, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
  { rank: 4, user: "User123", points: 19800, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
  { rank: 5, user: "TelegramFan", points: 17650, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
  { rank: 6, user: "JaneDoe", points: 15430, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026709d" },
  { rank: 7, user: "RefGod", points: 14990, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026710d" },
  { rank: 8, user: "DailyBonus", points: 13210, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026711d" },
  { rank: 9, user: "AdLancerFan", points: 12880, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026712d" },
  { rank: 10, user: "Newbie", points: 11500, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026713d" },
];

export default function StatsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+1,280 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ads Watched</CardTitle>
            <Clapperboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,450,832</div>
            <p className="text-xs text-muted-foreground">+50k today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points Distributed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,234,567</div>
            <p className="text-xs text-muted-foreground">Growing every second</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="text-accent"/>Global Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="font-bold">{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={player.avatar} alt={player.user} />
                        <AvatarFallback>{player.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{player.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{player.points.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
