"use client";

import { useState, useEffect } from "react";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Mock API call - replace with your actual API endpoint
        const response = await fetch("http://localhost:4000/user/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Transform the API response to match our profile structure
        const userProfile = {
          id: data.data.user._id || data.data.user.id,
          name: data.data.user.fullName || `${data.data.user.firstName} ${data.data.user.lastName}`,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
          avatar: data.data.user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: data.data.user.role,
          department: "Engineering", // Default value since not in API
          phone: data.data.user.phone || "Not provided",
          location: "Not provided", // Default value since not in API
          gender: data.data.user.gender,
          joinDate: data.data.user.createdAt,
          lastLogin: data.data.user.updatedAt,
          isActive: true, // Default value
          bio: data.data.user.bio || "No bio provided.",
          provider: data.data.user.provider,
        };
        
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
        
        // Mock data for development/demo purposes
       
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Mock API call - replace with your actual API endpoint
      const response = await fetch("http://localhost:4000/user/", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: updatedData.firstName || updatedData.name?.split(' ')[0],
          lastName: updatedData.lastName || updatedData.name?.split(' ')[1] || '',
          email: updatedData.email,
          phone: updatedData.phone,
          bio: updatedData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the updated response
      const updatedProfile = {
        id: data.data.user._id || data.data.user.id,
        name: data.data.user.fullName || `${data.data.user.firstName} ${data.data.user.lastName}`,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        email: data.data.user.email,
        avatar: data.data.user.avatar || profile.avatar,
        role: data.data.user.role,
        department: profile.department,
        phone: data.data.user.phone || "Not provided",
        location: profile.location,
        gender: data.data.user.gender,
        joinDate: data.data.user.createdAt,
        lastLogin: data.data.user.updatedAt,
        isActive: true,
        bio: data.data.user.bio || "No bio provided.",
        provider: data.data.user.provider,
      };
      
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message);
      
      // For demo purposes, update the profile with the new data even if API fails
      setProfile(prevProfile => ({
        ...prevProfile,
        ...updatedData
      }));
      
      return { ...profile, ...updatedData };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
}
