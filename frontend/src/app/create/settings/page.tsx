"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

// export default function Home() {
//   return (
//     <div className="">
//       <h1>Welcome to ScoutX</h1>
//     </div>
//   );
// }

export default function SettingsPage() {
  const [enabled, setEnabled] = useState({
    email: true,
    sms: false,
    inApp: true,
    calendarSync: false,
    anonymizeData: true,
  });

  return (
    <div className=" container flex-1 h-full w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl w-full mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Account Settings */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> Jane Doe</p>
            <p><strong>Email:</strong> jane@company.com</p>
            <p><strong>Company:</strong> VoiceHire</p>
            <button className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Change Password</button>
          </div>
          <div className="mt-4">
            <h3 className="font-medium">Notification Preferences</h3>
            {(["email", "sms", "inApp"] as const).map((type) => (
              <div key={type} className="flex items-center justify-between mt-2">
                <span>{type.toUpperCase()}</span>
                <Switch
                  checked={enabled[type]}
                  onChange={(val) => setEnabled((prev) => ({ ...prev, [type]: val }))}
                  className={`${enabled[type as keyof typeof enabled] ? 'bg-blue-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable {type}</span>
                  <span
                    className={`${enabled[type as keyof typeof enabled] ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Configuration */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">AI Agent Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white">
              <option>Voice Sensitivity: Low</option>
              <option>Voice Sensitivity: Medium</option>
              <option>Voice Sensitivity: High</option>
            </select>
            <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white">
              <option>Language: English</option>
              <option>Language: French</option>
              <option>Language: Spanish</option>
            </select>
            <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white">
              <option>Response Tone: Friendly</option>
              <option>Response Tone: Professional</option>
              <option>Response Tone: Neutral</option>
            </select>
          </div>
        </div>

        {/* Scheduling Rules */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Scheduling Rules</h2>
          <input type="text" placeholder="Interview Time Slots (e.g. 10am-12pm)" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-2" />
          <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white w-full mb-2">
            <option>Buffer Time: 15 mins</option>
            <option>Buffer Time: 30 mins</option>
            <option>Buffer Time: 60 mins</option>
          </select>
          <div className="flex items-center justify-between">
            <span>Enable Calendar Sync</span>
            <Switch
              checked={enabled.calendarSync}
              onChange={(val) => setEnabled({ ...enabled, calendarSync: val })}
              className={`${enabled.calendarSync ? 'bg-blue-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable calendar</span>
              <span
                className={`${enabled.calendarSync ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>

        {/* ATS Integration */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">ATS Integration</h2>
          <input type="text" placeholder="API Key or OAuth" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-2" />
          <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white w-full mb-2">
            <option>Sync Frequency: Real-time</option>
            <option>Sync Frequency: Daily</option>
            <option>Sync Frequency: Weekly</option>
          </select>
          <input type="text" placeholder="Filter Roles (e.g. Software Engineer)" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>

        {/* Automated Messaging */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Automated Messaging</h2>
          <textarea placeholder="Rejection Email Template" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-2" />
          <textarea placeholder="Interview Invite Template" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-2" />
          <input type="text" placeholder="Email Signature" className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>

        {/* Privacy & Data Handling */}
        <div className="border border-gray-700 rounded-2xl shadow p-4 bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Privacy & Data Handling</h2>
          <select className="p-2 border border-gray-600 rounded bg-gray-700 text-white w-full mb-2">
            <option>Data Retention: 30 Days</option>
            <option>Data Retention: 60 Days</option>
            <option>Data Retention: 90 Days</option>
          </select>
          <div className="flex items-center justify-between">
            <span>Anonymize Data After Rejection</span>
            <Switch
              checked={enabled.anonymizeData}
              onChange={(val) => setEnabled({ ...enabled, anonymizeData: val })}
              className={`${enabled.anonymizeData ? 'bg-blue-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Anonymize Data</span>
              <span
                className={`${enabled.anonymizeData ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <p className="text-sm text-gray-400 mt-2">We comply with GDPR to protect your candidate data.</p>
        </div>

        <button className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 shadow-lg">Save Changes</button>
      </div>
    </div>
  );
}
