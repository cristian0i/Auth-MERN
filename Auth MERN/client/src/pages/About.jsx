function About() {
  return (
    <main className="flex flex-col justify-center items-center min-h-[480px] p-4 text-center">
      <div className="sm:max-w-2xl">
        <h1 className="text-4xl font-semibold text-gray-800">About</h1>
        <p className="text-lg text-gray-700 mt-6">
          Our page is a small but powerful project that utilizes the MERN stack.
          We take pride in offering a secure and protected user experience, with
          protected routes to ensure the privacy of your data. In addition, we
          feature a complete CRUD system with MongoDB, allowing for efficient
          and effective data management. We also offer the option to change the
          profile picture using Google`s Firebase. Our goal is to provide an
          easy-to-use and secure platform for all our users.
        </p>
      </div>
    </main>
  );
}

export default About;
