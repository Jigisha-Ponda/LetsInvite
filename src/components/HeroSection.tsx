import heroBg from "../assets/BannerBG.png";
import BGPortrait from "../assets/BGPortrait.png";
import phonesImage from "../assets/banner.png";
import whatsappIcon from "../assets/WP.png";
import FloatingLeft from "../assets/499.png";
import FloatingRight from "../assets/999.png";
import FloatingRightBottom from "../assets/48hr.png";

const HeroSection = () => {
    return (
        <section className="relative w-full pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-24 lg:pb-10 min-h-[100svh] flex items-center justify-center overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src={heroBg}
                    alt="Hero Background"
                    className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
                />
                <img
                    src={BGPortrait}
                    alt="Hero Background"
                    className="absolute inset-0 block h-full w-full object-cover object-[50%_35%] md:hidden"
                />
                <div className="absolute inset-0 bg-white/55 md:bg-white/60 backdrop-blur-[1px] md:backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">

                {/* Heading */}
                <h1 className="text-[2rem] leading-tight md:text-5xl lg:text-6xl font-bold text-[#b93b9f] mb-2">
                    PREMIUM AI-POWERED <br />
                    <span className="text-[#4161ef]">3D VIDEO INVITES</span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg md:text-2xl text-[#7d4cc7] font-medium mb-8 md:mb-12">
                    DELIVERED IN 48 HOURS — UNDER ₹999
                </p>

                {/* Phones Image */}
                <div className="relative mx-auto flex w-[min(100%,22rem)] md:w-fit justify-center items-center">
                    <img
                        src={phonesImage}
                        alt="Video Invite Examples"
                        className="w-full md:w-[520px] lg:w-[760px] xl:w-[860px] object-contain"
                    />

                    {/* WhatsApp Floating Icon */}
                    <div className="absolute left-2 top-0 md:-left-20 md:top-10 lg:-left-[5rem] lg:top-[18%] z-20">
                        <img
                            src={whatsappIcon}
                            alt="WhatsApp"
                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 animate-bounce"
                        />
                    </div>

                    {/* Floating Price Left */}
                    <div className="absolute left-0 -bottom-4 md:-left-36 md:bottom-20 lg:-left-[11.5rem] lg:bottom-[17%] z-20">
                        <img
                            src={FloatingLeft}
                            alt="Video Invite Examples"
                            className="w-[98px] sm:w-[110px] md:w-[155px] lg:w-[175px] h-auto object-contain"
                        />
                    </div>

                    {/* Floating Price Right */}
                    <div className="absolute right-0 -top-4 md:-right-28 md:top-2 lg:-right-[10.5rem] lg:top-[8%] z-20">
                        <img
                            src={FloatingRight}
                            alt="Video Invite Examples"
                            className="w-[98px] sm:w-[110px] md:w-[155px] lg:w-[175px] h-auto object-contain"
                        />
                    </div>

                    {/* Delivery Badge */}
                    <div className="absolute right-0 -bottom-6 md:-right-48 md:bottom-10 lg:-right-[18.5rem] lg:bottom-[16%] z-20">
                        <img
                            src={FloatingRightBottom}
                            alt="Video Invite Examples"
                            className="w-[118px] sm:w-[128px] md:w-[215px] lg:w-[235px] h-auto object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
