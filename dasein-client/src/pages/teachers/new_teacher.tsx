const NewTeacher = () => {
  return (
    <div class="w-xl mx-auto flex flex-col gap-4">
      <h1 class="text-2xl font-bold">New Teacher</h1>
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="fullName">Full Name</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="text"
            id="fullName"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="email"
            id="email"
          />
        </div>
      </form>
    </div>
  );
};

export { NewTeacher };
