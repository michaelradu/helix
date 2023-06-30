import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { type ProblemMetadata } from "~/components/sections/StatementView";
import Editor from "~/components/sections/online-judge/Editor";
import Informations from "~/components/sections/online-judge/Informations";
import Solutions from "~/components/sections/online-judge/Solutions";
import AppShell from "~/components/ui/AppShell";
import { LoadingSection } from "~/components/ui/Loading";
import { api } from "~/utils/api";
import { toastPlain } from "~/utils/toast";

const OnlineJudgePage: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  const problem = api.problem.getProblemById.useQuery({
    id: parseInt(router.query.id as string),
  });

  if (session.status === "loading" || problem.isLoading)
    return <LoadingSection />;

  if (session.status === "unauthenticated") {
    void router.push("/");
    toastPlain("This page is not finished!");
  }

  return (
    <AppShell>
      <Head>
        <title>Helix | Online Judge</title>
      </Head>
      <main className="h-screen bg-secondary-700 text-white">
        <PanelGroup direction="horizontal" className="min-h-screen">
          <Panel defaultSize={44} minSize={42} maxSize={70}>
            <Informations problem={problem.data as ProblemMetadata} />
          </Panel>
          <PanelResizeHandle className="w-1 bg-secondary-700 focus:bg-secondary-600" />
          <Panel defaultSize={56} minSize={30} maxSize={58}>
            <PanelGroup direction="vertical" className="min-h-screen">
              <Panel defaultSize={80} minSize={20} maxSize={85}>
                <Editor />
              </Panel>
              <PanelResizeHandle className="h-1 bg-secondary-700 focus:bg-secondary-600" />
              <Panel defaultSize={20} minSize={15} maxSize={80}>
                <Solutions />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>
    </AppShell>
  );
};

export default OnlineJudgePage;
