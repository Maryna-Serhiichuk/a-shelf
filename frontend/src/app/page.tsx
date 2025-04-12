'use client'

import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Types } from "@/components/Types";

export default function Home() {
  return (
    <Container>
      <div className="grid grid-cols-[200px_1fr] gap-[5%]">
        <div className="col-[1/2] justify-items-center">
          <Categories/>
        </div>
        <div className="col-[2/3]">
          <Types/>
        </div>
      </div>
      <Bargain/>
    </Container>
  );
}
