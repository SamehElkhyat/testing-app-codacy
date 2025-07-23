import React from "react";
import "../MainSection/Mainsection.css";
import card1 from "../card1.png";
import card2 from "../card2.png";
import card3 from "../card3.png";
import card4 from "../card4.png";
import card5 from "../card5.png";
import card6 from "../card6.png";

import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// بيانات الكروت
const cardsData = [
  {
    image: card1,
    title: "متابعة الشحنات من الميناء",
    description: "تتبع كامل للحاويات من لحظة الوصول وحتى التسليم.",
  },
  {
    image: card2,
    title: "إعداد وتقديم المستندات الجمركية",
    description: "تجهيز الفواتير، بوليصات الشحن، شهادات المنشأ وغيرها.",
  },
  {
    image: card3,
    title: "التخليص الجمركي للبضائع",
    description: "إنهاء كافة الإجراءات الجمركية للشحنات بسرعة واحترافية.",
  },
  {
    image: card4,
    title: "شحن بحري دولي",
    description: "خدمات شحن بحري إلى ومن مختلف الموانئ العالمية بأسعار تنافسية.",
  },
  {
    image: card5,
    title: "خدمة التخزين المؤقت",
    description: "توفير مخازن مؤقتة لحفظ البضائع لحين إنهاء التخليص.",
  },
  {
    image: card6,
    title: "تتبع حالة الشحنة",
    description: "نوفر لك وسيلة لمتابعة حالة التخليص والشحن خطوة بخطوة حتى الوصول.",
  },
];

// أنيميشن للظهور التدريجي
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const MainSection = () => {
  return (
    <main className="main-section px-4 sm:px-6 lg:px-10 py-6">
    {/* العنوان */}
    <section className="flex justify-center mt-6 mb-10">
      <h1 className="text-[#002E5B] text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        حول منصه تخليصك
      </h1>
    </section>
  
    {/* شبكة البطاقات */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-right">
      {cardsData.map((card, index) => (
        <motion.div
          key={index}
          className="main-section-left"
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Card
            id="hellocards"
            className="shadow-md hover:shadow-lg transition-all duration-300"
            sx={{ maxWidth: "100%" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <span className="font-bold text-xl">{card.title}</span>
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <span className="font-medium text-md">{card.description}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </motion.div>
      ))}
    </section>
  </main>
  
  );
};

export default MainSection;
