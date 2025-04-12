'use client'

import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { LayoutCategories } from "@/components/LayoutCategories";
import { Types } from "@/components/Types";

export default function Home() {
  return (
    <LayoutCategories>
      <Types/>
    </LayoutCategories>
  );
}
