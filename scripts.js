// Your JavaScript code goes here
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already registered
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    displayUserProfile(parsedUser);

    // Check if fitness data is already stored
    const storedFitnessData = localStorage.getItem('fitnessData');

    if (storedFitnessData) {
      const parsedFitnessData = JSON.parse(storedFitnessData);
      displayRecentActivities(parsedFitnessData);
      displayDashboard(parsedFitnessData);
    }
  }
});

function displayUserProfile(user) {
  const profileDiv = document.getElementById('profile');
  document.getElementById('profileUsername').textContent = user.username;
  document.getElementById('profileEmail').textContent = user.email;
  profileDiv.style.display = 'block';
}

function logActivity() {
  const exercise = document.getElementById('exercise').value;
  const sets = document.getElementById('sets').value;
  const reps = document.getElementById('reps').value;
  const calories = document.getElementById('calories').value;

  const activity = `${exercise} - ${sets} sets x ${reps} reps, Calories: ${calories}`;

  // Add the new activity to the list
  const activityList = document.getElementById('activityList');
  const listItem = document.createElement('li');
  listItem.textContent = activity;
  activityList.appendChild(listItem);

  // Save fitness data to local storage
  const fitnessData = {
    activities: [...(JSON.parse(localStorage.getItem('fitnessData'))?.activities || []), activity]
  };

  localStorage.setItem('fitnessData', JSON.stringify(fitnessData));

  // Update the dashboard
  displayDashboard(fitnessData);
}

function displayRecentActivities(fitnessData) {
  const activityList = document.getElementById('activityList');

  fitnessData.activities.forEach(activity => {
    const listItem = document.createElement('li');
    listItem.textContent = activity;
    activityList.appendChild(listItem);
  });
}

function displayDashboard(fitnessData) {
  const dashboardDiv = document.getElementById('dashboard');
  dashboardDiv.innerHTML = ''; // Clear previous content

  const totalActivities = fitnessData.activities.length;
  const totalCaloriesBurned = fitnessData.activities.reduce((total, activity) => {
    const match = activity.match(/Calories: (\d+)/);
    return total + (match ? parseInt(match[1], 10) : 0);
  }, 0);

  const widgetContent = `
    <div class="widget">
      <h3>Workout Summary</h3>
      <p>Total Workouts: ${totalActivities}</p>
      <p>Total Calories Burned: ${totalCaloriesBurned}</p>
    </div>
  `;

  dashboardDiv.innerHTML = widgetContent;
}
