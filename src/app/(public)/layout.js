import NavBar from "@/app/(public)/components/NavBar";
import Footer from "@/app/(public)/components/Footer";

export default function PublicLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}