"use client";

import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Briefcase,
  Edit3,
  Save,
  X
} from "lucide-react";
import { useState } from "react";
// Date formatting utility
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const formatDateTime = (dateString) => {
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return dateString;
  }
};

export default function UserProfilePage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Error loading profile: {error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle no profile data
  if (!profile) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p>No profile data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEdit = () => {
    setEditData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
      // Show success message (you can add a toast notification here)
      console.log("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      // You can add error toast notification here
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };


  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Profile</h1>
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profile.avatar || "/placeholder-avatar.png"}
                  alt={profile.name}
                  className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                />
                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                  profile.isActive ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>
              <div>
                {!isEditing ? (
                  <>
                    <CardTitle className="text-2xl">{profile.name}</CardTitle>
                    <CardDescription className="text-base">{profile.email}</CardDescription>
                    <div className="flex items-center mt-2">
                      <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">{profile.role} • {profile.department}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editData.firstName}
                          onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editData.lastName}
                          onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <Label className="text-sm text-gray-600">Phone</Label>
                      {!isEditing ? (
                        <p className="font-medium">{profile.phone || "Not provided"}</p>
                      ) : (
                        <Input
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          placeholder="Phone number"
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <Label className="text-sm text-gray-600">Location</Label>
                      {!isEditing ? (
                        <p className="font-medium">{profile.location || "Not provided"}</p>
                      ) : (
                        <Input
                          value={editData.location}
                          onChange={(e) => setEditData({...editData, location: e.target.value})}
                          placeholder="Location"
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="text-sm text-gray-600">Join Date</Label>
                      <p className="font-medium">{formatDate(profile.joinDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="text-sm text-gray-600">Last Login</Label>
                      <p className="font-medium">{formatDateTime(profile.lastLogin)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="text-sm text-gray-600">Gender</Label>
                      <p className="font-medium capitalize">{profile.gender || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bio Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Bio</h3>
                {!isEditing ? (
                  <p className="text-gray-700 leading-relaxed">
                    {profile.bio || "No bio provided."}
                  </p>
                ) : (
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      className="mt-1 w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
