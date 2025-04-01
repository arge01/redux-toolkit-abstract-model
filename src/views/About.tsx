import { useState } from "react";
import Card from "@/components/card";
import { LayoutProviderValue } from "@/components/layout/Provider";
import { withLayout } from "@/components/layout/withLayout";

export type Props = {
  //Props Type
} & {
  layouProviderValue: LayoutProviderValue;
};

function About() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "structure" | "simulation"
  >("overview");

  return (
    <Card>
      <Card.Item className="w-full px-5">
        <div className="mx-auto p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-[#000] mb-6">
            Tournament Simulation Guide
          </h1>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 font-medium ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("structure")}
              className={`py-2 px-4 font-medium ${activeTab === "structure" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              Tournament Structure
            </button>
            <button
              onClick={() => setActiveTab("simulation")}
              className={`py-2 px-4 font-medium ${activeTab === "simulation" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              Simulation Process
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="space-y-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Welcome to Tournament Simulator
                </h2>
                <p className="text-gray-700 mb-4">
                  Create and simulate exciting soccer tournaments with realistic
                  match outcomes based on team skills and strengths.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      1. Create Tournament
                    </h3>
                    <p className="text-gray-600">
                      Set up your tournament with custom parameters and team
                      selection.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      2. Group Stage
                    </h3>
                    <p className="text-gray-600">
                      Teams compete in groups to qualify for knockout rounds.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      3. Win the Cup
                    </h3>
                    <p className="text-gray-600">
                      Follow the tournament through to the final champion.
                    </p>
                  </div>
                </div>

                <div className="bg-[#000] border-l-4 border-blue-500 p-4">
                  <p className="text-[#fff]">
                    <strong>Tip:</strong> You can view each team's strength and
                    skills before matches to predict outcomes.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "structure" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Tournament Structure
                </h2>

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Team Configuration
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>
                      <strong>32 Teams</strong> participate in the tournament
                    </li>
                    <li>
                      Divided into <strong>8 groups (A-H)</strong> with{" "}
                      <strong>4 teams each</strong>
                    </li>
                    <li>
                      Three difficulty levels available:{" "}
                      <span className="text-red-600">12Hard</span>,{" "}
                      <span className="text-yellow-600">12Norm</span>,{" "}
                      <span className="text-green-600">8Easy</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Tournament Progression
                  </h3>
                  <div className="relative">
                    {/* Tournament bracket visualization */}
                    <div className="flex flex-col items-center">
                      {/* Groups */}
                      <div className="flex justify-center mb-8">
                        {["A", "B", "C", "D", "E", "F", "G", "H"].map(
                          (group) => (
                            <div
                              key={group}
                              className="mx-2 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full font-bold border border-gray-400"
                            >
                              {group}
                            </div>
                          )
                        )}
                      </div>

                      {/* Lines */}
                      <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>

                      {/* Round of 16 */}
                      <div className="flex justify-center mb-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={`r16-${i}`}
                            className="!p-[30px] mx-4 w-16 h-8 flex items-center justify-center bg-gray-100 rounded text-sm font-medium border border-gray-300"
                          >
                            Round of 16
                          </div>
                        ))}
                      </div>

                      {/* Lines */}
                      <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>

                      {/* Quarter finals */}
                      <div className="flex justify-center mb-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={`qf-${i}`}
                            className="!p-[30px] mx-6 w-20 h-10 flex items-center justify-center bg-gray-200 rounded text-sm font-medium border border-gray-400"
                          >
                            Quarter Final
                          </div>
                        ))}
                      </div>

                      {/* Lines */}
                      <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>

                      {/* Semi finals */}
                      <div className="flex justify-center mb-8">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div
                            key={`sf-${i}`}
                            className="mx-10 w-24 h-12 flex items-center justify-center bg-gray-300 rounded text-sm font-medium border border-gray-500"
                          >
                            Semi Final
                          </div>
                        ))}
                      </div>

                      {/* Lines */}
                      <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>

                      {/* Final */}
                      <div className="flex justify-center mb-8">
                        <div className="w-28 h-14 flex items-center justify-center bg-gray-400 rounded font-medium text-white border border-gray-600">
                          Final
                        </div>
                      </div>

                      {/* Lines */}
                      <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>

                      {/* Champion */}
                      <div className="flex justify-center">
                        <div className="w-32 h-16 flex items-center justify-center bg-gray-700 rounded-full font-bold text-white border-2 border-gray-800">
                          Champion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "simulation" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Simulation Process
                </h2>

                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      1. Creating a Tournament
                    </h3>
                    <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>
                        Click <strong>"Create Tournament"</strong> button
                      </li>
                      <li>Search and select teams to participate</li>
                      <li>Teams will be automatically divided into groups</li>
                      <li>You'll be taken to the simulation screen</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      2. Group Stage
                    </h3>
                    <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>View all teams in their respective groups</li>
                      <li>Check each team's strength and skills</li>
                      <li>
                        Click <strong>"Next"</strong> to simulate group matches
                      </li>
                      <li>
                        Top 2 teams from each group advance to knockout stage
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      3. Knockout Rounds
                    </h3>
                    <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>
                        Continue clicking <strong>"Next"</strong> to progress
                        through rounds
                      </li>
                      <li>Follow the tournament bracket as teams advance</li>
                      <li>Quarter Finals → Semi Finals → Final</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg text-[#fff] mb-2">
                      4. Champion Celebration
                    </h3>
                    <ul className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>After the final match, the champion is crowned</li>
                      <li>View tournament statistics and match history</li>
                      <li>Option to save results or start a new tournament</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Start New Tournament
            </button>
          </div>
        </div>
      </Card.Item>
    </Card>
  );
}

export default withLayout(About);
