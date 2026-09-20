"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100, "Максимум 100 символов"),
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Некорректный email адрес")
    .max(255, "Максимум 255 символов"),
  message: z
    .string()
    .trim()
    .min(1, "Введите сообщение")
    .max(2000, "Максимум 2000 символов"),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
}

export function ContactForm({
  children,
  variant = "primary",
  label = "Написать нам",
}: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.website) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        setStatus("idle");
        form.reset();
      }, 200);
    }
  }

  const trigger = children ? (
    <DialogTrigger asChild>{children}</DialogTrigger>
  ) : variant === "primary" ? (
    <DialogTrigger asChild>
      <button className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00AEEF] px-9 py-4 text-sm font-semibold text-[#03121b] transition hover:scale-[1.03] glow-accent">
        {label}
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </DialogTrigger>
  ) : variant === "secondary" ? (
    <DialogTrigger asChild>
      <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.07]">
        {label}
      </button>
    </DialogTrigger>
  ) : (
    <DialogTrigger asChild>
      <button className="inline-flex cursor-pointer items-center gap-2 text-white/80 hover:text-[#00AEEF]">
        {label}
      </button>
    </DialogTrigger>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger}
      <DialogContent className="glass max-w-md border-white/10 p-0 sm:rounded-2xl">
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-6 text-left">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
              {status === "success" ? "Сообщение отправлено" : "Написать нам"}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#B5B5B5]">
              {status === "success"
                ? "Мы получили ваше сообщение и свяжемся с вами в ближайшее время."
                : "Заполните форму ниже, и мы ответим вам в удобном канале."}
            </DialogDescription>
          </DialogHeader>

          {status === "success" ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#00AEEF]/10">
                <CheckCircle className="h-8 w-8 text-[#00AEEF]" />
              </div>
              <p className="text-[#B5B5B5]">
                Спасибо за обращение. Мы свяжемся с вами как можно скорее.
              </p>
              <Button
                onClick={() => handleOpenChange(false)}
                className="mt-6 rounded-full bg-[#00AEEF] text-[#03121b] hover:bg-[#00AEEF]/90"
              >
                Закрыть
              </Button>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-500/10">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Не удалось отправить</h3>
              <p className="mt-2 text-sm text-[#B5B5B5]">
                Что-то пошло не так. Проверьте соединение и попробуйте ещё раз.
              </p>
              <Button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-full bg-[#00AEEF] text-[#03121b] hover:bg-[#00AEEF]/90"
              >
                Попробовать снова
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <input
                  {...form.register("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Имя</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Как к вам обращаться"
                          className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-[#B5B5B5]/50 focus-visible:border-[#00AEEF]/50 focus-visible:ring-[#00AEEF]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-[#B5B5B5]/50 focus-visible:border-[#00AEEF]/50 focus-visible:ring-[#00AEEF]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Сообщение</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Опишите, какое ПО вас интересует или задайте вопрос"
                          rows={4}
                          className="resize-none rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-[#B5B5B5]/50 focus-visible:border-[#00AEEF]/50 focus-visible:ring-[#00AEEF]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-11 w-full rounded-full bg-[#00AEEF] text-sm font-semibold text-[#03121b] transition hover:bg-[#00AEEF]/90 disabled:opacity-60"
                >
                  {status === "submitting" ? "Отправка..." : "Отправить сообщение"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
