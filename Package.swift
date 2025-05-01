// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "RevlabsCapacitorLocalAuth",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "RevlabsCapacitorLocalAuth",
            targets: ["LocalAuthPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "LocalAuthPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/LocalAuthPlugin"),
        .testTarget(
            name: "LocalAuthPluginTests",
            dependencies: ["LocalAuthPlugin"],
            path: "ios/Tests/LocalAuthPluginTests")
    ]
)