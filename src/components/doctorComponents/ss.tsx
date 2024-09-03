import pre from "../../assets/addp.png";
import add from "../../assets/add.png";
import find from "../../assets/find.png";
const posts = [
  {
    title: "write new prescription",

    img: pre,

    href: "/addprescription",
  },
  {
    title: "add new patient",

    img: add,

    href: "/addpatient",
  },
  {
    title: "Find prescrption",

    img: find,

    href: "/FindPatient",
  },
];

export default function SideBar() {
  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
          <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
            Doctor Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to the doctor's dashboard. Here you can manage your patients
            and add prescription here
          </p>
        </div>
        <ul className="grid gap-x- gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((items, key) => (
            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
              <a href={items.href}>
                <img
                  src={items.img}
                  loading="lazy"
                  alt={items.title}
                  className="w-50 h-40 rounded-lg mx-auto  "
                />
                <div className="mt-3 space-y-2">
                  <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold text-center">
                    {items.title}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
