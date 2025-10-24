import type { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: Props) {
  const { status } = useSelector((state: RootState) => state.auth);

  if (status) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} replace />;
  }
}
