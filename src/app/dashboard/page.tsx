"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Medal, Shield, Star, Crown, Clapperboard, Gift } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const badges = [
  { icon: Star, label: "First Ad", unlocked: true },
  { icon: Medal, label: "Top 10 Earner", unlocked: false },
  { icon: Shield, label: "Week Streak", unlocked: true },
  { icon: Crown, label: "Referral King", unlocked: false },
];

export default function UserDashboard() {
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState("Bronze");
  const [progress, setProgress] = useState(25);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const { toast } = useToast();

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setTimeout(() => {
      const earnedPoints = Math.floor(Math.random() * 10) + 5;
      setPoints(prev => prev + earnedPoints);
      setProgress(prev => (prev + 5 > 100 ? 100 : prev + 5));
      setIsWatchingAd(false);
      toast({
        title: "Ad Watched!",
        description: `You've earned ${earnedPoints} points.`,
      });
      // Close the dialog if it's open
      // This is a simple way, a better way would be to pass setOpen from Dialog
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }, 5000);
  };

  const handleClaimBonus = () => {
    setPoints(prev => prev + 50);
    setDailyBonusClaimed(true);
    toast({
      title: "Daily Bonus Claimed!",
      description: "You've received 50 points.",
    });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{points.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="shadow-lg cursor-pointer hover:bg-muted transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Watch Ad & Earn</CardTitle>
                <Clapperboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Click to Watch</div>
                <p className="text-xs text-muted-foreground">Earn points by watching short ads</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Watching Ad</DialogTitle>
              <DialogDescription>
                Please watch the ad to earn your reward.
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full">
              <Image src="https://picsum.photos/1280/720" alt="Advertisement" fill data-ai-hint="advertisement video" className="rounded-md object-cover"/>
              {isWatchingAd && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                   <p className="text-white text-lg font-bold">Ad playing...</p>
                 </div>
              )}
            </div>
            <Button onClick={handleWatchAd} disabled={isWatchingAd} className="w-full">
              {isWatchingAd ? "Claiming Reward..." : "Watch Ad (5s)"}
            </Button>
          </DialogContent>
        </Dialog>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Login Bonus</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleClaimBonus} disabled={dailyBonusClaimed}>
              {dailyBonusClaimed ? "Claimed for Today" : "Claim 50 Points"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">Come back tomorrow for another bonus!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Gamification</CardTitle>
            <CardDescription>Your current level and progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Level: {level}</p>
              <p className="text-sm text-muted-foreground">{progress}% to next level</p>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges you have unlocked.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <badge.icon className={`h-8 w-8 ${badge.unlocked ? 'text-accent' : 'text-muted-foreground/50'}`} />
                <span className="text-xs text-center">{badge.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
