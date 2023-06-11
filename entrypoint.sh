#!/bin/sh
yarn install
prisma migrate dev
yarn dev