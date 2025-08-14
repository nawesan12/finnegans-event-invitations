import React from "react";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  isLoading: boolean;
}

export const StatCard = ({ title, value, icon, isLoading }: StatCardProps) => (
  <Card>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white/60">{title}</h3>
        <Icon name={icon} className="w-5 h-5 text-white/40" />
      </div>
      {isLoading ? (
        <div className="h-8 w-20 bg-white/10 rounded-md animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </div>
  </Card>
);
