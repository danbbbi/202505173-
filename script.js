// 출발점 및 층 선택 변수
let selectedStartPoint = null;
let selectedFloor = null;
let startCoordinates = { x: 0, y: 0 };

// 건물 지도 클릭 이벤트
const buildingMap = document.getElementById('building-map');
buildingMap.addEventListener('click', (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // 출발점 선택 및 좌표 저장
  selectedStartPoint = { x: mouseX, y: mouseY };
  startCoordinates = selectedStartPoint;

  // 출발점 위치 표시
  alert(`출발점이 (${selectedStartPoint.x}, ${selectedStartPoint.y}) 위치로 설정되었습니다.`);
});

// 층 선택 버튼
const floorButtons = document.querySelectorAll('[id^="floor-"]');
floorButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedFloor = button.textContent;
    if (selectedStartPoint) {
      showPopup(selectedStartPoint, selectedFloor);
    } else {
      alert("먼저 출발점을 선택하세요.");
    }
  });
});

// 팝업 표시
function showPopup(startPoint, floor) {
  const distance = calculateDistance(startPoint, floor);
  document.getElementById('final-location').textContent = `출발점: (${startPoint.x}, ${startPoint.y})`;
  document.getElementById('final-floor').textContent = `층: ${floor}`;
  document.getElementById('final-distance').textContent = `출발점과의 거리: ${distance.toFixed(2)}m`;

  document.getElementById('popup').style.display = 'block';
}

// 거리 계산 함수 (간단한 유클리드 거리 계산)
function calculateDistance(startPoint, floor) {
  const floorCoordinates = getFloorCoordinates(floor);

  // 출발점과 층 위치 간의 유클리드 거리 계산
  return Math.sqrt(Math.pow(startPoint.x - floorCoordinates.x, 2) + Math.pow(startPoint.y - floorCoordinates.y, 2));
}

// 층별 좌표 반환
function getFloorCoordinates(floor) {
  const floorCoordinates = {
    "1층": { x: 150, y: 100 },
    "2층": { x: 150, y: 250 },
    "3층": { x: 150, y: 400 }
  };
  return floorCoordinates[floor] || { x: 0, y: 0 };
}

// 팝업 닫기
document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});
