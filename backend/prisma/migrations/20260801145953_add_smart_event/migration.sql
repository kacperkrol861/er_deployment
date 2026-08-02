-- CreateTable
CREATE TABLE "EmergencyReport" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FestivalZone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FestivalZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrowdPoint" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrowdPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmergencyReport" ADD CONSTRAINT "EmergencyReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyReport" ADD CONSTRAINT "EmergencyReport_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FestivalZone" ADD CONSTRAINT "FestivalZone_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdPoint" ADD CONSTRAINT "CrowdPoint_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
