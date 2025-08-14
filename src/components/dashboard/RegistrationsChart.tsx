"use client"
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { Attendee } from "@/lib/types";

interface RegistrationsChartProps {
  attendees: Attendee[];
  isLoading: boolean;
}

export const RegistrationsChart = ({ attendees, isLoading }: RegistrationsChartProps) => {
  const data = useMemo(() => {
    if (!attendees || attendees.length === 0) return [];
    const countsByDate = attendees.reduce(
      (acc, attendee) => {
        const date = new Date(attendee.createdAt).toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
        });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(countsByDate)
      .map(([date, count]) => ({ date, Asistentes: count }))
      .slice(-30); // Last 30 days
  }, [attendees]);

  if (isLoading)
    return (
      <Card className="p-4 h-80 flex items-center justify-center">
        <div className="animate-spin">
          <Icon name="loader" />
        </div>
      </Card>
    );

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Registros por Día
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis stroke="rgba(255, 255, 255, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#04102D",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Asistentes"
            stroke="#4BC3FE"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8, stroke: "#8694FF" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
