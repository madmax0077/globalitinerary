"use client";

import * as React from "react";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = React.useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("done");
      setMessage("You're on the list! Adventure awaits.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "done") {
    return (
      <div
        className={`flex items-center gap-3 rounded-full bg-emerald/10 px-5 py-3 text-emerald ${
          compact ? "" : "justify-center"
        }`}
      >
        <Check className="size-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`flex w-full flex-col gap-3 sm:flex-row ${compact ? "" : "mx-auto max-w-md"}`}
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="flex-1"
      />
      <Button type="submit" variant="gradient" disabled={status === "loading"}>
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Subscribe
      </Button>
      {status === "error" && (
        <p className="text-sm text-sunset sm:absolute sm:mt-14">{message}</p>
      )}
    </form>
  );
}
