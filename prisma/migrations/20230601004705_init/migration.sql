-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "user" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
