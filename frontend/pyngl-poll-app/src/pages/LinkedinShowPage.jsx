import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import { toast } from "react-hot-toast";

export default function LinkedInShowPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pollIdFromQuery = searchParams.get("pollId");

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkedinAuth, setLinkedinAuth] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // -----------------------------
  // STEP 1: Load poll + LinkedIn auth status
  // -----------------------------
  useEffect(() => {
    async function loadData() {
      try {
        if (!pollIdFromQuery) {
          toast.error("Missing poll ID");
          return navigate("/dashboard");
        }

        // Load LinkedIn auth status
        const authRes = await apiClient.get("/api/linkedin/auth/status");
        setLinkedinAuth(authRes.data.isAuthenticated);

        // Load poll
        const pollRes = await apiClient.get(`/api/polls/${pollIdFromQuery}`);
        setPoll(pollRes.data);

      } catch (err) {
        console.error(err);
        toast.error("Unable to load LinkedIn share page.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [pollIdFromQuery, navigate]);

  // -----------------------------
  // STEP 2: Start LinkedIn login
  // -----------------------------
  const connectLinkedIn = () => {
    window.location.href =
      `https://localhost:5000/api/linkedin/auth/linkedin/login?pollId=${pollIdFromQuery}`;
  };

  // -----------------------------
  // STEP 3: Publish the poll to LinkedIn
  // -----------------------------
  const publishToLinkedIn = async () => {
    if (!poll) return;

    setPublishing(true);
    const toastId = toast.loading("Publishing poll to LinkedIn...");

    try {
      await apiClient.post("/api/linkedin/publish-poll", {
        pynglPollId: poll._id,
      });

      toast.success("Poll published to LinkedIn!", { id: toastId });
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to publish.", {
        id: toastId,
      });
    } finally {
      setPublishing(false);
    }
  };

  // -----------------------------
  // UI — Loading Screen
  // -----------------------------
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-700 dark:text-gray-300">
        Loading LinkedIn Share Page…
      </div>
    );
  }

  // -----------------------------
  // UI — Ask to connect LinkedIn
  // -----------------------------
  if (!linkedinAuth) {
    return (
      <div className="p-10 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-3">Connect LinkedIn</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          To publish your poll, connect your LinkedIn account.
        </p>

        <button
          onClick={connectLinkedIn}
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Connect with LinkedIn
        </button>
      </div>
    );
  }

  // -----------------------------
  // UI — Review Page (Final)
  // -----------------------------
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-5">Review Your Poll</h1>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-xl font-semibold mb-3">{poll.question}</h3>

        <div className="space-y-3">
          {poll.options.map((opt, index) => (
            <div
              key={index}
              className="py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 text-center"
            >
              {opt.text}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={publishToLinkedIn}
        disabled={publishing}
        className="w-full mt-8 py-3 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
      >
        {publishing ? "Publishing…" : "Publish to LinkedIn"}
      </button>
    </div>
  );
}
