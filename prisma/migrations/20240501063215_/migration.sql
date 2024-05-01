-- CreateTable
CREATE TABLE "UserExample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" TEXT NOT NULL,
    "eventName" TEXT,
    "eventUrl" TEXT,
    "eventMemo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EventDate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EventUser" (
    "eventId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT,
    "userMemo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EventUserSel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "userSel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventId_key" ON "Event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventDate_eventId_eventDate_key" ON "EventDate"("eventId", "eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "EventUser_eventId_userId_key" ON "EventUser"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventUserSel_eventId_eventDate_userId_key" ON "EventUserSel"("eventId", "eventDate", "userId");
