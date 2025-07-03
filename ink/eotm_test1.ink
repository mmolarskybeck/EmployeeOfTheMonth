// Global state at top level
VAR actionsText = ""
VAR maxActions = 3

-> desk_idle

=== desk_idle ===
{maxActions:
- 0: -> after_actions
}
You are at your desk. What will you do?

You probably have time to do {maxActions} {maxActions == 1:thing|things} before your next meeting.

+ [Drink coffee]
++ You take a sip. 
~ maxActions = maxActions - 1
~ actionsText = "Drinking coffee. "
-> desk_idle
+ [Play Minesweeper]
++ You play a game for a few minutes. 
~ maxActions = maxActions - 1
~ actionsText = actionsText + "Playing Minesweeper. "
-> desk_idle
+ [Sit and wait]
++ You sit in silent anticipation. 
~ maxActions = maxActions - 1
~ actionsText = actionsText + "Sitting in silence. "
-> desk_idle

=== after_actions ===
// Summary of chosen actions
You’ve spent your idle time on:
{actionsText}

Looks like it's time for your next meeting. Ready?
* [Go.] You rush to your next meeting.

-> DONE