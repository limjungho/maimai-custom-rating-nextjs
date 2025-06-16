"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingScreen({ children, loadingDuration = 3000 }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* Player Information Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <Skeleton className="h-8 w-48 mx-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-40" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Music Score Table Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No.</TableHead>
                    <TableHead className="min-w-[200px]">Musicname</TableHead>
                    <TableHead className="w-[80px]">DX STD</TableHead>
                    <TableHead className="w-[100px]">Difficulty</TableHead>
                    <TableHead className="w-[80px]">Level</TableHead>
                    <TableHead className="w-[120px]">Score</TableHead>
                    <TableHead className="w-[80px]">FC / AP</TableHead>
                    <TableHead className="w-[120px]">Music Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-10" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-8 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return <div className="animate-in fade-in duration-500">{children}</div>;
}
