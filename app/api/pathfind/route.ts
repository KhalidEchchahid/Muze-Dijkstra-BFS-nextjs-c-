import { NextResponse } from "next/server";
import { spawn } from "child_process";
import * as fs from "fs/promises";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const { grid, start, end, algorithm } = body;

  console.log("Received request body:", JSON.stringify(body, null, 2));

  try {
    const input = JSON.stringify({ grid, start, end, algorithm });
    console.log("Preparing input for C++ executable:", input);

    // Create a temporary file with a unique name
    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const tempFileName = `input_${uuidv4()}.json`;
    const tempFilePath = path.join(tempDir, tempFileName);
    await fs.writeFile(tempFilePath, input);

    console.log("Temporary file created:", tempFilePath);

    // Spawn the C++ process and wait for completion
    const result = await new Promise((resolve, reject) => {
      const process = spawn("./Muze-bakcend.exe", [tempFilePath]);
      let output = "";
      let errorOutput = "";

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", async (code) => {
        // Clean up temporary file
        await fs.unlink(tempFilePath);

        console.log("C++ executable output:", output);
        console.log("C++ executable error output:", errorOutput);

        if (code !== 0) {
          console.error(`C++ executable exited with code ${code}`);
          reject(new Error(`C++ executable error: ${errorOutput}`));
        } else {
          try {
            const result = JSON.parse(output);
            console.log("Parsed result:", result);
            resolve(result);
          } catch (error) {
            console.error("Error parsing C++ output:", error);
            reject(new Error("Invalid output from C++ executable"));
          }
        }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred during pathfinding." },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(req: Request): Promise<Response> {
//   const body = await req.json();
//   const { grid, start, end, algorithm } = body;

//   console.log("Received request body:", JSON.stringify(body, null, 2));

//   try {
//     // Send request to the Linux API server
//     const response = await fetch("http://127.0.1.1:3000/run-cpp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ grid, start, end, algorithm }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("API response error:", response.status, errorText);
//       throw new Error(
//         `API request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     const result = await response.json();
//     console.log("Parsed result:", result);

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error:
//           "An error occurred during pathfinding: " +
//           (error instanceof Error ? error.message : String(error)),
//       },
//       { status: 500 }
//     );
//   }
// }
