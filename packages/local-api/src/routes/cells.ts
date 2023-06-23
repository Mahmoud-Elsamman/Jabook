import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    //Make sure the cell storage file exists
    //If it does not exist, add in a default list of cells

    const isLocalApiError = (error: any): error is LocalApiError => {
      return typeof error.code === "string";
    };

    try {
      //Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      res.send(JSON.parse(result));
    } catch (error) {
      if (isLocalApiError(error)) {
        if (error.code === "ENOENT") {
          //Add code to create a file and add default cells
          console.log(`creating a default file in that path ${fullPath}`);
          await fs.writeFile(fullPath, "[]", "utf-8");
          res.send([]);
        }
      } else {
        throw error;
      }
    }
    //Parse a list of cells out of it
    //Send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    //Take the list of cells from the request obj

    const { cells }: { cells: Cell[] } = req.body;
    //Serialize them
    //Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
