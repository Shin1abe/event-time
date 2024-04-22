-- CreateTable
CREATE TABLE "GroceryList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "checked" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "etEvent" (
    "eventId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "eventUrl" TEXT NOT NULL,
    "eventMemo" TEXT
);
