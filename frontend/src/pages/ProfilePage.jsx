import { useEffect, useState, useContext } from "react";
import { getUser, updateUser } from "../api/user";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user: authUser, setUser: setAuthUser, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUser();
        if (res.success && res.data) {
          setUser({ name: res.data.name, email: res.data.email });
        } else {
          setError("Failed to fetch profile data");
        }
      } catch {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) fetchProfile();
  }, [authLoading]);

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
      const updated = await updateUser({ name: user.name.trim(), email: user.email.trim() });
      setUser({ name: updated.name, email: updated.email });
      setAuthUser(updated);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-slate-100 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-lg border border-slate-200">
        <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">Your Profile</h2>

        {error && <p className="text-red-600 text-sm mb-4 font-medium text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 font-medium text-center">{success}</p>}

        <div className="space-y-6">
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-semibold text-slate-700">Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="col-span-2 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-semibold text-slate-700">Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="col-span-2 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || loading || authLoading}
            className="w-full rounded-xl px-6 py-3 bg-zinc-600 hover:bg-zinc-500 text-white font-semibold"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
