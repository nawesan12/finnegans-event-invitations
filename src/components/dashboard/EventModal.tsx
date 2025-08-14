"use client"
import React, { useState, useEffect } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Event } from "@/lib/types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id" | "attendees">) => void;
  eventToEdit: Event | null;
}

export const EventModal = ({ isOpen, onClose, onSave, eventToEdit }: EventModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    capacity: "100",
    status: "PLANNING" as Event['status'],
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        name: eventToEdit.name,
        date: new Date(eventToEdit.date).toISOString().substring(0, 10),
        location: eventToEdit.location,
        capacity: String(eventToEdit.capacity),
        status: eventToEdit.status,
      });
    } else {
      setFormData({
        name: "",
        date: "",
        location: "",
        capacity: "100",
        status: "PLANNING",
      });
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, capacity: parseInt(formData.capacity) });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-lg border-white/20">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">
            {eventToEdit ? "Editar Evento" : "Crear Nuevo Evento"}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-1 rounded-full"
          >
            <Icon name="x" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Nombre del Evento
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Fecha
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Capacidad
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Estado
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white/10 border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-[#4BC3FE] outline-none"
            >
              <option value="PLANNING">Planeando</option>
              <option value="UPCOMING">Próximo</option>
              <option value="COMPLETED">Completado</option>
              <option value="CANCELED">Cancelado</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="px-6 py-2">
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
