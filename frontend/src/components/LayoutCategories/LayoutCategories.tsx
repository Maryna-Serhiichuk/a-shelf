import { FC, PropsWithChildren } from "react";
import { Container } from "../Container";
import { Categories } from "../Categories";
import { Bargain } from "../Bargain";

export const LayoutCategories: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container>
            <div className="grid grid-cols-[200px_1fr] gap-0 sm:gap-[5%]">
                <div className="hidden sm:block col-[1/2] justify-items-center">
                    <Categories />
                </div>
                <div className="col-[1/3] sm:col-[2/3]">
                    {children}
                </div>
            </div>
            <Bargain />
        </Container>
    );
}