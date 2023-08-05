import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ContestsTable } from "~/components/sections/ContestsTable";
import AppShell from "~/components/ui/AppShell";
import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { LoadingSection } from "~/components/ui/Loading";
import { Progress } from "~/components/ui/Progress";

const TrainingPage: NextPage = () => {
  const session = useSession();

  if (session.status === "loading") return <LoadingSection />;

  return (
    <AppShell>
      <Head>
        <title>Helix | Training</title>
      </Head>
      <main className="mx-auto max-w-7xl bg-secondary-700 text-white">
        <div className="rounded-lg bg-secondary-800 p-3 ring-secondary-600 lg:mt-3 lg:ring-4">
          <h2 className="items-center pb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Upcoming contests
          </h2>
          <div className="overflow-x-auto rounded-lg">
            <ContestsTable isSmall={false} isDark={true} />
          </div>
          {/* <div className="py-3">
            <p>write some text idk</p>
          </div> */}
        </div>
        <div className="mx-3 mt-5 grid grid-rows-3 gap-5 md:mx-0 md:grid-cols-3 md:grid-rows-1">
          <Card>
            <CardHeader>
              <CardTitle>Capture The Flag</CardTitle>
              <CardDescription>
                CTF challenges are related to cybersecurity and can help you
                gain a better understanding of IT infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>See challenges</Button>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-3">
              <Progress value={33} />
              <p>33% of challenges solved</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Competitive programming</CardTitle>
              <CardDescription>
                CP is dumb as hell but here we are anyway lorem ipsum doler mit
                amet lorem ipsum doler mit amet lorem ipsum doler mit amet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/online-judge">
                <Button>See challenges</Button>
              </Link>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-3">
              <Progress value={90} />
              <p>90% of challenges solved</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Euler project</CardTitle>
              <CardDescription>
                Project Euler is a series of challenging mathematical problems
                that will require more than just mathematical insights to solve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>See challenges</Button>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-3">
              <Progress value={55} />
              <p>55% of challenges solved</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AppShell>
  );
};

export default TrainingPage;
