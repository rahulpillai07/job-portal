"use client"
export default function Error() {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="flex flex-col m-auto justify-center items-center p-3 space-y-5">
          <h1 className="text-4xl font-extrabold tracking-tighter lg:text-5xl">ERROR</h1>
          <p>An unexpected error occurred</p>
        </div>
      </div>
    );
  }
