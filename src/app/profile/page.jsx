"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import ClientLogoutButton from "@/components/ClientLogoutButton";
import Toast from "@/components/Toast";
import { getProfile, updateProfile, updateImage } from "@/service/allService";

export default function Profile() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    avatar: "/assets/avatar.png",
  });
  const [originalData, setOriginalData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    avatar: "/assets/avatar.png",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [selectedFile, setSelectedFile] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        const p = res?.data || res || {};
        const mapped = {
          email: p.email || "",
          firstName: p.first_name || "",
          lastName: p.last_name || "",
          avatar: p.profile_image || "/assets/avatar.png",
        };
        setData(mapped);
        setOriginalData(mapped);
      } catch {
        setToast({ message: "Gagal memuat profil.", type: "error" });
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((s) => ({ ...s, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (!editing) return;
    fileRef.current?.click();
  };

  const handleAvatarEditClick = () => {
    if (!editing) {
      setEditing(true);
      setTimeout(() => fileRef.current?.click(), 60);
    } else {
      fileRef.current?.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setData((s) => ({ ...s, avatar: url }));
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    setLoading(true);
    try {
      const promises = [];
      promises.push(
        updateProfile({
          first_name: data.firstName,
          last_name: data.lastName,
        }),
      );

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        promises.push(updateImage(formData));
      }

      await Promise.all(promises);

      try {
        const res = await getProfile();
        const p = res?.data || res || {};
        const synced = {
          email: p.email || "",
          firstName: p.first_name || "",
          lastName: p.last_name || "",
          avatar: p.profile_image || "/assets/avatar.png",
        };
        setData(synced);
        setOriginalData(synced);
      } catch {
        setOriginalData(data);
      }

      setSelectedFile(null);
      setEditing(false);
      setToast({ message: "Profil berhasil disimpan.", type: "success" });
    } catch (err) {
      setToast({
        message: err?.message || "Gagal menyimpan profil.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setData(originalData);
    setSelectedFile(null);
    setEditing(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="rounded-full overflow-hidden w-28 h-28 border border-gray-200 bg-white flex items-center justify-center"
            >
              <Image
                src={data.avatar}
                alt="avatar"
                width={112}
                height={112}
                className="object-cover"
              />
            </button>

            <button
              type="button"
              onClick={handleAvatarEditClick}
              aria-label="Edit avatar"
              className="absolute -right-1 -bottom-1 bg-white border border-gray-200 rounded-full p-2 shadow-md flex items-center justify-center"
            >
              <MdEdit className="w-4 h-4 text-gray-600" />
            </button>

            {editing && (
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            {data.firstName} {data.lastName}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4">
          <label className="text-xs font-medium text-gray-600">Email</label>
          <FormInput
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={!editing}
          />

          <label className="text-xs font-medium text-gray-600">
            Nama Depan
          </label>
          <FormInput
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="Nama Depan"
            disabled={!editing}
          />

          <label className="text-xs font-medium text-gray-600">
            Nama Belakang
          </label>
          <FormInput
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Nama Belakang"
            disabled={!editing}
          />

          <div className="mt-4 grid grid-cols-1 gap-3">
            {!editing ? (
              <>
                <Button onClick={handleEdit} className="cursor-pointer">
                  Edit Profil
                </Button>
                <ClientLogoutButton />
              </>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  loading={loading}
                  className="cursor-pointer"
                >
                  Simpan
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: "", type: "success" })}
          />
        </div>
      </div>
    </div>
  );
}
