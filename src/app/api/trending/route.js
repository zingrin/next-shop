export async function GET() {
  const products = [
    {
      id: 1,
      name: "Premium Summer Dress",
      price: 1250,
      image: "https://i.ibb.co.com/Rp91t6jJ/images-q-tbn-ANd9-Gc-Rjxfw0p-GAzais-KY-kg-I2ln-Yiz-JLv-P6phh-Vsi-NLXj-R-QKl-Fxm3-QNXY-xzj-O9-KPgj-Ir.jpg",
    },
    {
      id: 2,
      name: "Casual Cotton Shirt",
      price: 850,
      image: "https://i.ibb.co.com/Fb5wN7P3/images-q-tbn-ANd9-Gc-Shiqc-Uj-JMd0-F-5-ERGRW6r-HN-Mr2-B5w-MDYz57-T6puni-XV4-YINY22-D6y-Os55-E6y-LC3.jpg",
    },
    {
      id: 3,
      name: "Stylish Denim Jacket",
      price: 1650,
      image: "https://i.ibb.co.com/9kDvV6LR/images-q-tbn-ANd9-Gc-Qy-L1s1-U34-NJq1tu-Dabe-Qd-I3hrzvi-Enz-QFb1-SJGe-BWvix-ADx-L5hbh-RFHJ5-N4nh-Oq.jpg",
    },
    {
      id: 4,
      name: "Classic Sneakers",
      price: 2200,
      image: "https://i.ibb.co.com/rK5wpL88/images-q-tbn-ANd9-Gc-Qoay3-Ebj3df-Vltc4og-Dd-Go-Xr-LUizou-QTUutso-HO4o1q8qx-LKjmb-Prwrqi-C2d-D-X-C8.jpg",
    },
  ];

  return Response.json(products);
}
