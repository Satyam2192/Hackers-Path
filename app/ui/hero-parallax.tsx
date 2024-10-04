import React, { useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        Your Cybersecurity <br /> Journey Begins Here
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white">
        Take the first step towards becoming a cybersecurity expert today. Explore our modular curriculum, discover the interactive labs and real-world scenarios that await you, and connect with our vibrant community of learners.
      </p>
    </div>
  );
};

const ProductCard = React.memo(({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <motion.div
      ref={ref}
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        {inView && (
          <Image
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-left-top absolute h-full w-full inset-0"
            alt={product.title}
          />
        )}
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
});

interface HeroParallaxProps {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = React.memo(({ products }) => {
  const rows = useMemo(() => [
    products.slice(0, 5),
    products.slice(5, 10),
    products.slice(10, 15),
  ], [products]);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 210]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div style={{ rotateX, opacity, rotateZ, translateY }} className="">
        {rows.map((row, index) => (
          <motion.div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "flex-row-reverse space-x-reverse" : "flex-row"
            } space-x-20 mb-20`}
          >
            {row.map((product) => (
              <ProductCard
                key={product.title}
                product={product}
                translate={index % 2 === 0 ? translateX : translateXReverse}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});