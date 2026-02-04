import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/user.js";
import Button from "../components/Button";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((data) => setUser({ name: data.name, email: data.email }))
      .catch(() => setError("Failed to fetch profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!user.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) {
      setError("Valid email is required");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateUser({
        name: user.name.trim(),
        email: user.email.trim(),
      });
      setUser({ name: updated.name, email: updated.email });
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-slate-50 p-6 rounded-2xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900">
        Your Profile
      </h2>

      {error && <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-3 font-medium">{success}</p>}

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-slate-700 mb-2 font-medium">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
